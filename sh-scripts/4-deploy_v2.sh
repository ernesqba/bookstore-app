kubectl apply -f $PWD/../kubernetes/secrets/secret.yaml  
kubectl apply -f $PWD/../kubernetes/configmaps/configmap.yaml  
kubectl apply -f $PWD/../kubernetes/deployments/deployment_books_service_v2.yaml
kubectl apply -f $PWD/../kubernetes/deployments/deployment_users_service_v2.yaml
kubectl apply -f $PWD/../kubernetes/deployments/deployment_reviews_service_v2.yaml
kubectl apply -f $PWD/../kubernetes/services/service.yaml