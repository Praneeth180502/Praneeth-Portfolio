"""
Lightweight in-memory rate limiter.

This is intentionally simple (per-process, fixed-window) so the service has
zero external dependencies out of the box. Because REDIS_ENABLED is planned
for future expansion, this module exposes the same interface
(`check_rate_limit`) that a Redis-backed implementation would use, so
swapping the backend later is a one-file change.
"""
import time
from collections import defaultdict
from typing import Dict, List

from app.core.exceptions import RateLimitExceededError

# key -> list of unix timestamps of recent hits
_HITS: Dict[str, List[float]] = defaultdict(list)


def check_rate_limit(key: str, max_requests: int, window_seconds: int) -> None:
    """
    Raise RateLimitExceededError if `key` has exceeded `max_requests`
    within the trailing `window_seconds`. Otherwise records this hit.
    """
    now = time.time()
    window_start = now - window_seconds

    hits = _HITS[key]
    # Drop expired hits
    while hits and hits[0] < window_start:
        hits.pop(0)

    if len(hits) >= max_requests:
        raise RateLimitExceededError(
            f"Rate limit exceeded: max {max_requests} requests per {window_seconds}s.",
            details={"retry_after_seconds": int(hits[0] + window_seconds - now)},
        )

    hits.append(now)
