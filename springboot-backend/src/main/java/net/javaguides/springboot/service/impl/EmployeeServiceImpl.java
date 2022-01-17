package net.javaguides.springboot.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;
import net.javaguides.springboot.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	
	private EmployeeRepository employeeRepository; //par lui on passe toutes nos demande pour la db
	
	public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
		super();
		this.employeeRepository = employeeRepository;
	}

	@Override
	public Employee saveEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	} 

	@Override
	public Employee getEmployeeById(long id) {
//		Optional<Employee> employee = employeeRepository.findById(id);
//		if(employee.isPresent()) {
//			return employee.get();
//		}else { 
//			throw new ResourceNotFoundException("Employee", "Id", id);
//		}
		return employeeRepository.findById(id).orElseThrow(() -> 
						new ResourceNotFoundException("Employee", "Id", id));
	}

	@Override
	public Employee updateEmployee(Employee employee, long id) {
		// we need to check whether employee with given id is exist in DB or not
		Employee existingEmployee = employeeRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Employee", "Id", id));
		//updating field
		existingEmployee.setFirstName(employee.getFirstName());
		existingEmployee.setLastName(employee.getLastName());
		existingEmployee.setEmail(employee.getEmail());
		// save existing employee to DB
		employeeRepository.save(existingEmployee);
		return existingEmployee;
	}

	@Override
	public String deleteEmployee(long id) {
		// check whether a employee exist in a DB or not
		employeeRepository.findById(id).orElseThrow(() -> 
								new ResourceNotFoundException("Employee", "Id", id));
		employeeRepository.deleteById(id);
		return new String("Employee deleted successfully!.");
	}

	@Override
	public String deleteEmployeeList(Long[] idList) {
		if(idList.length==0){
			employeeRepository.deleteAll();
			return new String("All the Employees deleted successfully!.");
		}
		String ans="Employees with ids: ";
		Boolean flag= false;
		for (int i = 0; i < idList.length; i++) {
			Optional<Employee> employee = employeeRepository.findById(idList[i]);
			if(!employee.isPresent()) {
				ans+=idList[i]+", ";
				flag=true;
			}	
		}
		if (flag)
			return ans+="are not existings";
		else {
			for (int i = 0; i < idList.length; i++) {
				employeeRepository.deleteById(idList[i]);
			}
			return new String("Employees deleted successfully!.");
		}
	}
	
}