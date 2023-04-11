import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ApplyForBussinessView } from '@/roanuz/view/customer/applyForBussiness/view';
import { ApplyForBussinessMuation, GetDocumentPreSignedUrlQuery } from '@/roanuz/store/customer/query';

export const ApplyForBussinessController = () => {
  const [saving, setSaving] = useState(false);
  const [customerCreatedComplete, setCustomerCreatedComplete] = useState(false);
  const [uidOfCustomer, setUidOfCustomer] = useState();

  const [errorDocuments, setErrorDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const [promiseCount, setPromiseCount] = useState();
  const [showDocumentErrorView, setShowDocumentErrorView] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [
    fetchPreSignedUrl,
    { loading: urlLoading, error: urlError, data: urlData },
  ] = useLazyQuery(GetDocumentPreSignedUrlQuery, { fetchPolicy: 'no-cache' });

  const onGetPresignedUrl = (rzUuid) => {
    const fileExts = selectedDocuments.map((doc) => doc.name);
    fetchPreSignedUrl({
      variables: {
        fileNameWithExtension: fileExts,
        rzCustomerUuid: rzUuid,
      },
    });
  };

  const uploadFile = (file, url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-type', file.type);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 204) {
            console.log(`Uploaded ${file.name}`);
            setPromiseCount((state) => state - 1);
            resolve(xhr.response);
          } else {
            console.log(`Failed to Upload ${file.name}`, xhr.status);
            setErrorDocuments((state) => [...state, file]);
            setPromiseCount((state) => state - 1);
            reject(Error(xhr.statusText));
          }
        }
      };
      xhr.onerror = () => {
        reject(Error('Network Error'));
      };
      xhr.send(file);
    });
  };

  const processUploadingToS3 = async (urls) => {
    setPromiseCount(selectedDocuments.length);
    setErrorDocuments([]);
    try {
      const fileUploads = selectedDocuments.map((i, index) => uploadFile(i, urls[index]));
      await Promise.all(fileUploads);
      console.log('All files uploaded');
    } catch (e) {
      console.log('Some files failed to upload', e);
    }
  };

  useEffect(() => {
    if (urlData) {
      setUploading(true);
      processUploadingToS3(urlData.rzGetDocumentPreSignedUrl.url);
      return;
    }
    if (urlError) {
      console.error('Presigned url fetch Error', urlError);
    }
  }, [
    urlLoading,
    urlError,
    urlData,
  ]);

  const reUploadDocumentsHandler = () => {
    onGetPresignedUrl(uidOfCustomer);
  };

  useEffect(() => {
    if (promiseCount === 0 && selectedDocuments.length > 0) {
      setUploading(false);
      if (errorDocuments && errorDocuments.length > 0) {
        setShowDocumentErrorView(true);
      } else {
        setCustomerCreatedComplete(true);
        setShowDocumentErrorView(false);
        setSelectedDocuments([]);
        setUidOfCustomer(null);
        console.log('✅ Customer created and Documents Uploaded');
      }
    }
  }, [promiseCount]);

  const [createCustomer, { error }] = useMutation(ApplyForBussinessMuation, {
    onCompleted: (data) => {
      // Ensure customer is created
      if (data.createCustomerV2) {
        console.log('✅ Customer created', error, data.email);
        const rzUuid = data.createCustomerV2.customer.rz_uuid;
        if (selectedDocuments && selectedDocuments.length > 0 && rzUuid) {
          setUidOfCustomer(rzUuid);
          onGetPresignedUrl(rzUuid);
        } else {
          setCustomerCreatedComplete(true);
        }
      } else {
        setSaving(false);
      }
    },
  });

  const onSave = (variables) => {
    setSaving(true);
    createCustomer({ variables });
  };

  return (
    <ApplyForBussinessView
      onSave={onSave}
      saving={saving}
      saveError={error}
      customerCreatedComplete={customerCreatedComplete}
      docsContainer={{
        selectedDocuments,
        setSelectedDocuments,
        showDocumentErrorView,
        errorDocuments,
        setErrorDocuments,
        reUploadDocumentsHandler,
        uploading: urlLoading || uploading,
      }}
    />
  );
};

// ApplyForBussinessController.propTypes = {};
