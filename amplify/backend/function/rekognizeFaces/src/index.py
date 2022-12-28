import json
import boto3
from PIL import ImageDraw, ImageFont, Image
import base64
import io

def handler(event, context):
    data = json.loads(event.get('body') or '{}')
    region = "ap-south-1"
    bucket = "imagesstore65739-staging"
    key = "public/"+data['photo'] 
    client=boto3.client('rekognition' , region_name = region)
    

    
    
    s3  = boto3.client('s3', region_name=region)
    fileObj = s3.get_object(Bucket = bucket, Key = key)
    fileContent = fileObj['Body']
    image = Image.open(fileContent)

    boundingBoxes = data['boundingBoxes']
    img_width, img_height = image.size
    faces_name = []

    for face in boundingBoxes:
        width = img_width * face['Width']
        height = img_height * face['Height']
        left = img_width * face['Left']
        top = img_height * face['Top']
        area = (left, top, left + width, top + height)
        cropped_image = image.crop(area)
        bytes_array = io.BytesIO()
        cropped_image.save(bytes_array, format="PNG")
        request = {
            'Bytes': bytes_array.getvalue()
        }
        recognizeResult = client.search_faces_by_image(
            CollectionId=data['collectionName'], Image=request, FaceMatchThreshold=70)
        if recognizeResult['FaceMatches']:
            name = recognizeResult['FaceMatches'][0]['Face']['ExternalImageId']
        else:
            name = 'Not recognized'
        
        faces_name.append(name)
    


    #fontsize = 1  
    # img_fraction = 0.25

    # font = ImageFont.truetype("arial.ttf", fontsize)
    # breakpoint = img_fraction * image.size[0]
    # jumpsize = 75
    # while True:
    #     if font.getsize(text)[0] < breakpoint:
    #         fontsize += jumpsize
    #     else:
    #         jumpsize = jumpsize // 2
    #         fontsize -= jumpsize
    #     font = ImageFont.truetype(font_path, fontsize)
    #     if jumpsize <= 1:
    #         break
    # while font.getsize(txt)[0] < img_fraction*image.size[0]:
    #     # iterate until the text size is just larger than the criteria
    #     fontsize += 1
    #     font = ImageFont.truetype("arial.ttf", fontsize)

    # # optionally de-increment to be sure it is less than criteria
    # fontsize -= 1
    # font = ImageFont.truetype("arial.ttf", size=size)
    

    draw = ImageDraw.Draw(image)

    for i in range(len(boundingBoxes)):
        if not faces_name[i]:
            continue
        width = img_width * boundingBoxes[i]['Width']
        height = img_height * boundingBoxes[i]['Height']
        left = img_width * boundingBoxes[i]['Left']
        top = img_height * boundingBoxes[i]['Top'] 
        points = ((left, top), (left + width, top), (left + width,
                                                     top + height), (left, top + height), (left, top))
        draw.line(points, fill='#00d400', width=4)
        draw.text((left, top), faces_name[i])

    
    bytes_array = io.BytesIO()
    image.save( bytes_array, format="JPEG")
    dataURL = 'data:image/jpeg;base64,' + base64.b64encode(bytes_array.getvalue()).decode("utf-8")
  
    return { 
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(dataURL)
    }