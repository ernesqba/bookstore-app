kubectl apply -f $PWD/../kubernetes/storage/persistent_volume_claim.yaml 
sleep 2
kubectl apply -f $PWD/../kubernetes/secrets/secret_db_mysql.yaml  
sleep 2
kubectl apply -f $PWD/../kubernetes/configmaps/configmap_db_mysql.yaml  
sleep 2
kubectl apply -f $PWD/../kubernetes/deployments/deployment_copy_files_pod.yaml  
sleep 10
kubectl cp $PWD/../db-scripts/ copy-files-to-pvc:/ 
kubectl delete -f $PWD/../kubernetes/deployments/deployment_copy_files_pod.yaml