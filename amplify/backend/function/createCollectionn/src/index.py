import json
import boto3
from botocore.exceptions import ClientError

def handler(event, context):
    region = "ap-south-1"
    data = json.loads(event.get('body') or '{}')
    client=boto3.client('rekognition' , region_name = region)
    try:
        data = client.create_collection(CollectionId=data['collectionName'] )
        result = "Collection created successfully"
    except client.exceptions.ResourceAlreadyExistsException:
        result = "Collection already present"
    except ClientError as e:
        result = "Can not create / Don't give space in Collection name"
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(result)
    }