# FFMPEG Lambda Layer - Video Converter

Deploy the base image to an S3 bucket you have available

```bash
aws s3 cp assets/icon.png s3://devopstar/resources/aws-ffmpeg-serverless-convert/base/icon.png
```

## Deploy Lambda Layer

Edit the first few lines in `lambda-layer/Makefile`

```bash
cd lambda-layer
make deploy
```

## Deploy the Function

Edit the ARN to match the one from your FFmpeg stack `Default: 'arn:aws:lambda:us-east-1:277790246569:layer:ffmpeg:1'`

Deploy the stack

```bash
cd video-converter
make deploy
```

## Upload Demo Video

```bash
aws s3 cp assets/demo.mp4 s3://uploads-ffmpeg-video-converter/demo.mp4
```

## Attribution

- [Serverless video thumbnail builder](https://github.com/serverlesspub/s3-lambda-ffmpeg-thumbnail-builder)
- [FFmpeg/FFprobe AWS Lambda layer](https://github.com/serverlesspub/ffmpeg-aws-lambda-layer)
