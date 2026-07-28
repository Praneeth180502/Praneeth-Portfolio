"""Business logic for serving the resume file download."""
from pathlib import Path

from app.core.config import Settings
from app.core.exceptions import FileNotAvailableError


class ResumeService:
    def __init__(self, settings: Settings):
        self.settings = settings

    def get_resume_path(self) -> Path:
        path = self.settings.RESUME_FILE_PATH
        if not path.exists() or not path.is_file():
            raise FileNotAvailableError(
                "Resume file is not currently available. Please check back later."
            )
        return path

    @property
    def download_filename(self) -> str:
        return self.settings.RESUME_FILENAME
