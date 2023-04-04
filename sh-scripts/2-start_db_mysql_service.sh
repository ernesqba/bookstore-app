kubectl apply -f $PWD/../kubernetes/secrets/secret_db_mysql.yaml  
kubectl apply -f $PWD/../kubernetes/configmaps/configmap_db_mysql.yaml  
kubectl apply -f $PWD/../kubernetes/deployments/deployment_db_mysql_service.yaml
kubectl apply -f $PWD/../kubernetes/services/service_db_mysql_service.yaml