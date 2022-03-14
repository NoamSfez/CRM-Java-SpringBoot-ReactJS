package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.model.Customer;
import net.javaguides.springboot.service.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CustomerController {
	@Autowired
	private CustomerService customerService;

	public CustomerController(CustomerService customerService) {
		super();
		this.customerService = customerService;
	}
	
	/*
	method: GET
	description: get all customers
	path: api/customers
	*/
	@GetMapping("/customers")
	public ResponseEntity<List<Customer>> getAllCustomers(){
		return new ResponseEntity <List<Customer>> (customerService.getAllCustomers(), HttpStatus.OK);
	}
	
	/*
	method: GET
	description: get an existing customer with his ID
	path: api/customer/10
	*/
	@GetMapping("/customer/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable("id") long customerId){
		return new ResponseEntity<Customer>(customerService.getCustomerById(customerId), HttpStatus.OK);
	}
	
	/*
	method: POST
	description: create a customer
	path: api/customer
	body:{
		"firstName": "abc",
		"lastName": "def",
		"email":"abc.def@gmail.com"
	}
	*/
	@PostMapping("/customer")
	public ResponseEntity<Customer> saveCustomer(@RequestBody Customer customer){
		//le body est automatiquement converti en Java Object avec les bons fileds:
		//normalement avec Lambrod ou jsp quoi mais ici  comme il marche pas avec les setters et getters 
		return new ResponseEntity<Customer>(customerService.saveCustomer(customer), HttpStatus.CREATED);
	}
	
	/*
	method: PUT
	description: update an existing customer with his ID
	path: api/customer/10
	body:{
		"firstName": "abc",
		"lastName": "def",
		"email":"abc.def@gmail.com"
	}
	*/
	@PutMapping("/customer/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable("id") long id
												  ,@RequestBody Customer customer){
		return new ResponseEntity<Customer>(customerService.updateCustomer(customer, id), HttpStatus.OK);
	}
	
	/*
	method: DELETE
	description: delete an existing customer with his ID
	path: api/customer/10
	*/
	@DeleteMapping("/customer/{id}")
	public ResponseEntity<String> deleteCustomer(@PathVariable("id") long id){
		// delete Customer from DB
		return new ResponseEntity<String>(customerService.deleteCustomer(id), HttpStatus.OK);
	}
	
	/*
	method: DELETE
	description: delete all customers
	path: api/customers
	*/	@DeleteMapping("/customers")
	public ResponseEntity<String> deleteCustomerList(){
		// delete Customers from DB
		return new ResponseEntity<String>(customerService.deleteAllCustomers(), HttpStatus.OK);
	}
	
}