from rest_framework import generics
from ..models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from django.db.models import Q, Count
from taggit.models import Tag
from rest_framework.exceptions import PermissionDenied
from ..pagination import *
from django.shortcuts import get_object_or_404


class CreateBot(generics.CreateAPIView):
    queryset = Chatbots.objects.all()
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated] 

    def perform_create(self, serializer):
        serializer.save(belongs_to=self.request.user)

class UpdateBot(generics.UpdateAPIView):
    serializer_class = BotUpdateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Chatbots.objects.filter(belongs_to=self.request.user)
    
    def get_object(self):
        bot_id = self.kwargs.get("pk")
        try:
            return self.get_queryset().get(id=bot_id)
        except Chatbots.DoesNotExist:
            raise NotFound("This bot isnt yours.")
        
class GetBot(generics.RetrieveAPIView):
    serializer_class = PublicBotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Chatbots.objects.annotate(
            session_count=Count("aisession", distinct=True)
        )
        return queryset

    def get_object(self):
        bot_id = self.kwargs.get("pk")
        try: 
            bot = self.get_queryset().get(id=bot_id)
            if bot.belongs_to != self.request.user:
                if not bot.is_public: 
                    raise PermissionDenied("This bot is not yours")
                else: return bot
            else: return bot
        except Chatbots.DoesNotExist:
            raise NotFound("Bot not found")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class ListPublicBots(generics.ListCreateAPIView): 
    # outdated - do not use. // for test uses only
    serializer_class = ShowBotSerializer
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    
    def get_queryset(self):
        return Chatbots.objects.filter(is_public=True).select_related('belongs_to')
    
class ListPublicBotsV2(generics.ListCreateAPIView):
    serializer_class = PublicBotSerializer
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination

    def get_queryset(self):
        # sort_by: 0=алфавит, 1=рейтинг, 2=сессии, 3=время
        # method: 0=возрастание, 1=убывание
        sort_by = self.request.query_params.get("sort_by", "0")
        method = self.request.query_params.get("method", "0")

        try:
            sort_by = int(sort_by)
        except ValueError:
            sort_by = 0

        try:
            method = int(method)
        except ValueError:
            method = 0

        order_prefix = "-" if method == 1 else ""

        queryset = Chatbots.objects.filter(is_public=True).annotate(
            session_count=Count("aisession", distinct=True)
        )

        if sort_by == 0:
            return queryset.order_by(f"{order_prefix}name")
        elif sort_by == 1:
            return queryset.order_by(f"{order_prefix}rate")
        elif sort_by == 2:
            return queryset.order_by(f"{order_prefix}session_count")
        else:
            return queryset.order_by("name")
        
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class ListPublicBotsToNotRegistered(generics.ListCreateAPIView):
    # outdated - do not use.
    serializer_class = ShowBotSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Chatbots.objects.filter(is_public=True).select_related(
            'belongs_to'
            ).only(
                'id', 'name', 
                'public_description', 'avatar', 
                'belongs_to__username', 'belongs_to__avatar'
                )
    
class ListUserBots(generics.ListCreateAPIView):
    # outdated - use /u/read/<uuid:pk>
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chatbots.objects.filter(belongs_to=self.request.user)
    
class SearchBots(generics.ListCreateAPIView):
    serializer_class = PublicBotSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Chatbots.objects.filter(is_public=True)
        query = self.request.query_params.get("q", None)
        try:
            return queryset.filter(
                Q(name__icontains=query) 
                | 
                Q(public_description__icontains=query)
                |
                Q(description__icontains=query))
        except AttributeError as e:
            return f"Nothing found: {e}"

class DeleteBot(generics.DestroyAPIView):
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        chatbot = get_object_or_404(Chatbots, id=self.kwargs.get("pk"))
        if chatbot.belongs_to_id != self.request.user.id:
            raise PermissionDenied("Not yours.")
        return chatbot
    

# services
class GetTopTags(generics.ListCreateAPIView):
    serializer_class = TagSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            num = self.kwargs.get("pk")
        except:
            return Response({"error": "what"})
        finally: 
            try:
                tags = Tag.objects.annotate(
                    num_times=Count('taggit_taggeditem_items')
                ).filter(
                    taggit_taggeditem_items__content_type__model='chatbots'
                ).order_by('-num_times')[:num]
                serializer = TagSerializer(tags, many=True)
                return Response(serializer.data)
            except AssertionError as e:
                return Response({
                    "error": f"Error has occured",
                    "content": f"{e}"
                    })
            
class SearchByTags(generics.ListCreateAPIView):
    serializer_class = PublicBotSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Chatbots.objects.filter(is_public=True)
        query = self.request.query_params.get("query", None)
        if query:
            tags = query.split(',')

            q_objects = Q()
            for tag in tags:
                q_objects |= Q(tags__name=tag)
            return queryset.filter(q_objects).distinct()
        return Chatbots.objects.none()
    
class GetPopularBotsBySession(generics.ListCreateAPIView):
    # outdated
    serializer_class = ShowBotSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        num = self.kwargs.get("pk")

        # getting most used bots by session
        sessionquery = AiSession.objects.values('chatbot').annotate(
            num_sessions=Count('id')
        ).order_by('-num_sessions')[:num]

        ids = [item['chatbot'] for item in sessionquery]
        bots = Chatbots.objects.filter(
            is_public=True, 
            id__in=ids).annotate(
                total_messages=Count('aisession__messages')
            )
        
        return bots
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        data = serializer.data
        bot_ids = [item['id'] for item in data]
        bot_sessions = AiSession.objects.filter(
            chatbot_id__in=bot_ids
            ).values(
                'chatbot'
            ).annotate(
                count=Count('id')
            )
        session_count = {item['chatbot']: item['count'] for item in bot_sessions}
        enriched_data = []
        for bot_data in data:
            bot_id = bot_data['id']
            bot_data['num_sessions'] = session_count.get(bot_id, 0)
            bot_data['num_messages'] = getattr(self.get_queryset().filter(
                id=bot_id
                ).first(), 'total_messages', 0)
            enriched_data.append(bot_data)

        return Response(enriched_data)



        
