
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


  placa(e: string) {
    let value = ''

    if (e) {

      value = value.replace(/\D/g, '')

      value = value.replace(/(\d{1,3})(\d{1,4})?/, function (match, p1, p2) {
        if (p2 === undefined) {
          return `${p1}`
        }
        // if (p3 === undefined) {
        //   return `${p1}/${p2}`
        // }

        return `${p1}-${p2}`
      })

    }


    return e
  }

}