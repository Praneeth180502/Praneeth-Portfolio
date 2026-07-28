"""Router: GET /api/resume/download — serves the resume PDF file."""
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse

from app.api.deps import get_resume_service
from app.services.resume_service import ResumeService

router = APIRouter(prefix="/resume", tags=["Resume"])


@router.get("/download", summary="Download resume PDF")
async def download_resume(
    service: Annotated[ResumeService, Depends(get_resume_service)],
) -> FileResponse:
    path = service.get_resume_path()
    return FileResponse(
        path=path,
        media_type="application/pdf",
        filename=service.download_filename,
    )
