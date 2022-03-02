package net.javaguides.springboot.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Customer;
import net.javaguides.springboot.repository.CustomerRepository;
import net.javaguides.springboot.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	private CustomerRepository customerRepository; //par lui on passe toutes nos demande pour la db
	
	public CustomerServiceImpl(CustomerRepository customerRepository) {
		super();
		this.customerRepository = customerRepository;
	}

	@Override
	public Customer saveCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

	@Override
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	} 

	@Override
	public Customer getCustomerById(long id) {
//		Optional<Customer> customer = customerRepository.findById(id);
//		if(customer.isPresent()) {
//			return customer.get();
//		}else { 
//			throw new ResourceNotFoundException("Customer", "Id", id);
//		}
		return customerRepository.findById(id).orElseThrow(() -> 
						new ResourceNotFoundException("Customer", "Id", id));
	}

	@Override
	public Customer updateCustomer(Customer customer, long id) {
		// we need to check whether customer with given id is exist in DB or not
		Customer existingCustomer = customerRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Customer", "Id", id));
		//updating field
		existingCustomer.setFirstName(customer.getFirstName());
		existingCustomer.setLastName(customer.getLastName());
		existingCustomer.setEmail(customer.getEmail());
		// save existing customer to DB
		customerRepository.save(existingCustomer);
		return existingCustomer;
	}

	@Override
	public String deleteCustomer(long id) {
		// check whether a employee exist in a DB or not
		customerRepository.findById(id).orElseThrow(() -> 
								new ResourceNotFoundException("Customer", "Id", id));
		customerRepository.deleteById(id);
		return new String("Customer deleted successfully!.");
	}
	@Override
	public String deleteAllCustomers() {
		customerRepository.deleteAll();
		return new String("Customers deleted successfully!.");
	}

//	@Override
//	public String deleteCustomerList(List<Long> idList) {
//		String ans="Customers with ids: ";
//		Boolean flag= false;
//		for (Long id : idList) {
//			Optional<Customer> customer = customerRepository.findById(id);
//			if(!customer.isPresent()) {
//				ans+=id.toString()+", ";
//				flag=true;
//			}	
//		}
//		if (flag)
//			return ans+="are not existings";
//		else {
//			customerRepository.deleteAllById(idList);
//			return new String("Customers deleted successfully!.");
//		}
//	}
	
	
}