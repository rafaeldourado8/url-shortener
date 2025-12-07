import logging
import sys

def setup_logger():
    logger = logging.getLogger("url_shortener")
    logger.setLevel(logging.INFO)
    
    # Formato JSON é melhor para ferramentas como Datadog/CloudWatch
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        '{"timestamp": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s"}'
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger

logger = setup_logger()