kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/storage/persistent_volume_claim.yaml 
sleep 2
kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/secrets/secret_db_mysql.yaml  
sleep 2
kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/configmaps/configmap_db_mysql.yaml  
sleep 2
kubectl apply -f /Projects/Master/cloud/last-work/kubernetes/deployments/deployment_copy_files_pod.yaml  
sleep 10
kubectl cp /Projects/Master/cloud/last-work/db-scripts/ copy-files-to-pvc:/ 
kubectl delete -f /Projects/Master/cloud/last-work/kubernetes/deployments/deployment_copy_files_pod.yaml