
export class Mask {
  public cellPhone(value: string) {
    let e = value.replace(/\D/g, '');
    e.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')

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

  public placa(text: string) {
    // Remove any non-alphanumeric character
    let cleaned = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // Apply the old plate mask (LLL-NNNN)
    let letters = cleaned.substring(0, 3).replace(/[^A-Z]/g, '');
    let digits = cleaned.substring(3).replace(/[^0-9A-Z]/g, '');

    cleaned = letters + digits

    if (cleaned.length > 3) {
      cleaned = cleaned.replace(/^([A-Z]{3})([0-9A-Z]{1,4})/, '$1-$2');
    }

    if (cleaned.length <= 7) {
      cleaned = cleaned.replace(/^([A-Z]{3})(\D)([0-9]{1,4})/, '$1-$2');
    } else {
      // Apply the new plate mask (LLL1L11)
      cleaned = cleaned.replace(/^([A-Z]{3})([0-9]{1})([A-Z]{1})([0-9]{1,2})/, '$1$2$3$4');
    }

    console.log(cleaned)

    return cleaned
  };

  formatCPFOrCNPJ(text: string): string {
    let numericValue = text.replace(/\D/g, '');

    if (numericValue.length <= 11) {
      return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (numericValue.length === 14) {
      return numericValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      );
    } else {
      return numericValue;
    }


  }

}