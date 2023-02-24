kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/istio/destination_rule.yaml
kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/istio/virtual_service_v1.yaml
kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/secrets/secret.yaml  
kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/configmaps/configmap.yaml  
kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/deployments/deployment_frontend_service.yaml
kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/services/service_frontend_service.yaml