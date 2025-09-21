from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("main.urls")),
    path("dashboard/", include("dashboard.urls")),
    path("schemas/", SpectacularAPIView().as_view(), name="schema"),
    path("docs/", SpectacularSwaggerView(url_name='schema').as_view(), name="swagger-ui"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
