package com.romanov.storage.services;

import com.romanov.storage.dto.TypeDto;
import com.romanov.storage.repos.TypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TypeService {

    private TypeRepo typeRepo;

    @Autowired
    public TypeService(TypeRepo typeRepo) {
        this.typeRepo = typeRepo;
    }

    @Nullable
    public List<TypeDto> getAllUsedTypes( String creator ){
        Optional<List<String>> res = typeRepo.findAllUsedTypes( creator );
        return res.map(strings -> strings.stream().map(TypeDto::new).collect(Collectors.toList())).orElse(null);
    }
}
