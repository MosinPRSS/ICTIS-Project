from rest_framework.pagination import PageNumberPagination

class StandardResultsPagination(PageNumberPagination):
    page_size = 42 # default
    page_query_param = 'page'
    page_size_query_param = 'page_size'