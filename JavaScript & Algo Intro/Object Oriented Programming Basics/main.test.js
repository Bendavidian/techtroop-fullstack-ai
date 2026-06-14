const { Document, Employee, Manager, Cleaner, Office } = require('./main');

describe('Document', () => {
  it('should store EmployeeName passed to constructor', () => {
    const doc = new Document('John');
    expect(doc.EmployeeName).toBe('John');
  });
});

describe('Employee', () => {
  it('should store name passed to constructor', () => {
    const emp = new Employee('Alice');
    expect(emp.name).toBe('Alice');
  });

  it('work() should push exactly 10 Documents into office.documents', () => {
    const emp = new Employee('Alice');
    const office = { documents: [] };
    emp.work(office);
    expect(office.documents.length).toBe(10);
  });

  it('work() should set EmployeeName on each Document to the employee name', () => {
    const emp = new Employee('Alice');
    const office = { documents: [] };
    emp.work(office);
    office.documents.forEach(doc => expect(doc.EmployeeName).toBe('Alice'));
  });
});

describe('Manager', () => {
  it('should store name passed to constructor', () => {
    const mgr = new Manager('Bob');
    expect(mgr.name).toBe('Bob');
  });

  it('should initialise employees as an empty array', () => {
    const mgr = new Manager('Bob');
    expect(mgr.employees).toEqual([]);
  });

  it('hireEmployee() should create an Employee and push it into employees', () => {
    const mgr = new Manager('Bob');
    mgr.hireEmployee('Alice');
    expect(mgr.employees.length).toBe(1);
    expect(mgr.employees[0].name).toBe('Alice');
  });

  it('askEmployeesToWork() should call work() on every employee', () => {
    const mgr = new Manager('Bob');
    mgr.hireEmployee('Alice');
    mgr.hireEmployee('Charlie');
    const office = { documents: [] };
    mgr.askEmployeesToWork(office);
    expect(office.documents.length).toBe(20);
  });
});

describe('Cleaner', () => {
  it('should store name passed to constructor', () => {
    const cleaner = new Cleaner('Dave');
    expect(cleaner.name).toBe('Dave');
  });

  it('clean() should log "Clean"', () => {
    const cleaner = new Cleaner('Dave');
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    cleaner.clean();
    expect(spy).toHaveBeenCalledWith('Clean');
    spy.mockRestore();
  });
});

describe('Office', () => {
  it('should initialise documents, managers and cleaners as empty arrays', () => {
    const office = new Office();
    expect(office.documents).toEqual([]);
    expect(office.managers).toEqual([]);
    expect(office.cleaners).toEqual([]);
  });

  it('hireCleaner() should create a Cleaner and push it into cleaners', () => {
    const office = new Office();
    office.hireCleaner('Eve');
    expect(office.cleaners.length).toBe(1);
    expect(office.cleaners[0].name).toBe('Eve');
  });

  it('hireManager() should create a Manager and push it into managers', () => {
    const office = new Office();
    office.hireManager('Frank');
    expect(office.managers.length).toBe(1);
    expect(office.managers[0].name).toBe('Frank');
  });

  it('startWorkDay() should ask every manager to have employees work', () => {
    const office = new Office();
    office.hireManager('Frank');
    office.managers[0].hireEmployee('Alice');
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    office.startWorkDay();
    expect(office.documents.length).toBe(10);
    spy.mockRestore();
  });

  it('startWorkDay() should call clean() on every cleaner', () => {
    const office = new Office();
    office.hireCleaner('Eve');
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    office.startWorkDay();
    expect(spy).toHaveBeenCalledWith('Clean');
    spy.mockRestore();
  });
});
