# Routes
## FRONT
/partition -> redirect  
/partition/[uuid]  
/partitions/{ id }/[uuid]

## REDIS
{ POST } /temp/partitions/[uuid]  
{ GET } /temp/partitions/[uuid]  

## MONGO
{ POST } /partitions/[uuid]  
{ GET } /partitions  
{ GET } /partitions/{ id }  
{ PUT } /partitions/{ id }/[uuid]  
