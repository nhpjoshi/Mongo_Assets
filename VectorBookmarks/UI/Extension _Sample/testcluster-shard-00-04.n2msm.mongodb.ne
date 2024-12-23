testcluster-shard-00-04.n2msm.mongodb.net


mongodb+srv://AdminCluster:admin@testcluster-shard-00-04.n2msm.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster

mongodb+srv://AdminCluster:admin@testcluster.n2msm.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster&readPreference=nearest 



mongosh "mongodb+srv://testcluster.n2msm.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster&readPreference=nearest" --apiVersion 1 --username AdminCluster


https://www.mongodb.com/docs/atlas/reference/replica-set-tags/#query-using-pre-defined-replica-set-tags
"mongodb+srv://testcluster.n2msm.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster&readPreferenceTags=nodeType:ANALYTICS" --apiVersion 1 --username <username>
