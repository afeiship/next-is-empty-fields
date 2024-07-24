require('../src');

describe('unit tests', () => {
  test('values is simple object', function () {
    // arrange
    const values1 = { username: 'john', password: 'password', email: 'john@example.com' };
    const values2 = { username: '', password: '', email: '' };
    const values3 = { username: null, password: null, email: null };
    const values4 = { username: '', password: null, email: null };
    // act
    const result1 = nx.isEmptyFields(values1);
    const result2 = nx.isEmptyFields(values2);
    const result3 = nx.isEmptyFields(values3);
    const result4 = nx.isEmptyFields(values4);

    // assert
    expect(result1).toBe(false);
    expect(result2).toBe(true);
    expect(result3).toBe(true);
    expect(result4).toBe(true);
  });

  test('values is array of objects', function () {
    // arrange
    const values1 = [
      { username: 'john', password: 'password', email: 'john@example.com' },
      { username: '', password: '', email: '' },
      { username: null, password: null, email: null }
    ];

    const values2 = [
      { username: null, password: null, email: null },
      { username: '', password: '', email: '' }
    ];

    // act
    const result1 = nx.isEmptyFields(values1);
    const result2 = nx.isEmptyFields(values2);

    // assert
    expect(result1).toBe(false);
    expect(result2).toBe(true);
  });

  test('nested values', function () {
    // arrange
    const values1 = {
      user: { username: 'john', password: 'password', email: 'john@example.com' },
      address: [{ street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' }]
    };

    const values2 = {
      user: { username: '', password: '', email: '' },
      address: [{ street: '', city: '', state: '', zip: '' }]
    };

    expect(nx.isEmptyFields(values1)).toBe(false);
    expect(nx.isEmptyFields(values2)).toBe(true);
  });

  test('customize options.isEmpty', () => {
    const cusIsEmpty = (value) => value === '';
    const values1 = { username: 'john', password: 'password', email: 'john@example.com' };
    const values2 = { username: '', password: '', email: '' };
    const values3 = { username: null, password: null, email: null };
    const values4 = { username: '', password: null, email: null };

    const result1 = nx.isEmptyFields(values1, { isEmpty: cusIsEmpty });
    const result2 = nx.isEmptyFields(values2, { isEmpty: cusIsEmpty });
    const result3 = nx.isEmptyFields(values3, { isEmpty: cusIsEmpty });
    const result4 = nx.isEmptyFields(values4, { isEmpty: cusIsEmpty });

    expect(result1).toBe(false);
    expect(result2).toBe(true);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });

  test('bussines case: nested object', () => {
    const obj = {
      US: {
        college_tags: {
          'US News Rank': null
        },
        program_tags: {
          'US News Subject Rank': null
        }
      }
    };

    const res = nx.isEmptyFields(obj);
    expect(res).toBeTruthy();
  });

  test('null value should get false', ()=> {
    const obj1 = null;
    const obj2 = undefined;
    const obj3 = 1;
    const obj4 = '';
    const obj5 = false;
    const obj6 = 0;

    expect(nx.isEmptyFields(obj1)).toBeFalsy();
    expect(nx.isEmptyFields(obj2)).toBeFalsy();
    expect(nx.isEmptyFields(obj3)).toBeFalsy();
    expect(nx.isEmptyFields(obj4)).toBeFalsy();
    expect(nx.isEmptyFields(obj5)).toBeFalsy();
    expect(nx.isEmptyFields(obj6)).toBeFalsy();
  });
});
