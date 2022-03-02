package net.javaguides.springboot.service;

import java.util.List;

import net.javaguides.springboot.model.Customer;

public interface CustomerService {
	
	Customer saveCustomer(Customer customer);
	
	List<Customer> getAllCustomers();
	
	Customer getCustomerById(long id);
	
	Customer updateCustomer(Customer customer, long id);
	
	String deleteCustomer(long id);

	String deleteAllCustomers();
}