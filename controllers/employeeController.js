const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ message: 'Employee not found.' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.eid, req.body);
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.query.eid);
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchEmployees = async (req, res) => {
    try {
      const { firstName, lastName, email, salary } = req.query;
  
      // Build a dynamic filter object
      const filter = {};
      if (firstName) filter.firstName = { $regex: firstName, $options: 'i' }; // Case-insensitive match
      if (lastName) filter.lastName = { $regex: lastName, $options: 'i' };    // Case-insensitive match
      if (email) filter.email = email;
      if (salary) filter.salary = Number(salary);
  
      const employees = await Employee.find(filter);
  
      if (employees.length === 0) {
        return res.status(404).json({ message: 'No employees found matching the criteria.' });
      }
  
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Error searching employees', error });
    }
  };
