package com.romanov.advisor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SimpleAdviceService {

    @Autowired
    StorageApiService storageApiService;


}
