# Udemy Video Converter - FFMPEG Lambda Layer

## Deploy Lambda Layer

Edit the first few lines in `ffmpeg-aws-lambda-layer/Makefile`

```bash
cd ffmpeg-aws-lambda-layer
make deploy
```

## Deploy the Function

Edit the ARN to match the one from your FFmpeg stack `Default: 'arn:aws:lambda:us-east-1:277790246569:layer:ffmpeg:1'`

Deploy the stack

```bash
cd video-converter
make deploy
```
