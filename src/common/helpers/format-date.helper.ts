const monthsAbbreviations: Record<string, string> = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

export const formatOMDBDateToISO = (date: string) => {
  if (!date) {
    throw new Error('Invalid date format');
  }

  const parts = date.split(' ');
  if (parts.length !== 3) {
    throw new Error('Invalid date format');
  }

  const [day, monthAbbreviation, year] = date.split(' ');
  const month = monthsAbbreviations[monthAbbreviation];

  if (!month || isNaN(Number(day)) || isNaN(Number(year))) {
    throw new Error('Invalid date format');
  }

  return `${year}-${month}-${day.padStart(2, '0')}`;
};
