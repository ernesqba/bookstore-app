kubectl apply -f $PWD/../kubernetes/istio/destination_rule.yaml
kubectl apply -f $PWD/../kubernetes/istio/virtual_service_v1.yaml
kubectl apply -f $PWD/../kubernetes/secrets/secret.yaml  
kubectl apply -f $PWD/../kubernetes/configmaps/configmap.yaml  
kubectl apply -f $PWD/../kubernetes/deployments/deployment_frontend_service.yaml
kubectl apply -f $PWD/../kubernetes/services/service_frontend_service.yaml