package com.romanov.storage.repos;

import history.Record;
import org.springframework.data.jpa.repository.JpaRepository;


public interface HistoryRepo extends JpaRepository<Record, Long> {
}
