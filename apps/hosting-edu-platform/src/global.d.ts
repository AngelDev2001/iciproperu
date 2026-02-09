type RoleCode = 'super_admin' | 'admin' | 'user';

interface User {
  id: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  document: {
    type: 'DNI' | 'RUC' | 'CE';
    number: string;
  };
  phone: {
    prefix: string;
    number: string;
  };
  profilePhoto?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
}
