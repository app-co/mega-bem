
export class Mask {
  public cpf(value: string) {
    let e = value

    if (e) {

      e = e.replace(/\D/g, '');
      e.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    return e;
  }

  public cellPhone(value: string) {
    let e = null
    if (value) {
      e = value.replace(/\D/g, '');
      e.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }

    return e;
  }

  public date(value: string) {
    let e = null

    if (value) {
      // e = value.replace(/\D/g, '');
      value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')

    }

    return e;
  }
}