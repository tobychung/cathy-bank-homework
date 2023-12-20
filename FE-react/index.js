const Heading = ({date, changeMonth, resetDate}) => (
  <nav className="calendar--nav">
    <a >&#8249;</a>
    <h1 onClick={() => resetDate()}>{date.format('YYYY')} 年 {date.format('MM')} 月</h1>
    <a >&#8250;</a>
  </nav>
);

const Day = ({currentDate, date, startDate, endDate, onClick}) => {
  let className = [];

  if (moment().isSame(date, 'day')) {
    className.push('active');
  }

  if (date.isSame(startDate, 'day')) {
    className.push('start');
  }

  if (date.isBetween(startDate, endDate, 'day')) {
    className.push('between');
  }

  if (date.isSame(endDate, 'day')) {
    className.push('end');
  }

  if (! date.isSame(currentDate, 'month')) {
    className.push('muted');
  }

  return (
    <span onClick={() => onClick(date)} currentDate={date} className={className.join(' ')}>{date.date()}日</span>
  )
};

const Days = ({date, startDate, endDate, onClick}) => {
  const thisDate = moment(date);
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf('month');
  const previousMonth = moment(date).subtract(1, 'month');
  const previousMonthDays = previousMonth.daysInMonth();
  const nextMonth = moment(date).add(1, 'month');
  let days = [];
  let labels = [];

  for (let i = 1; i <= 7; i++) {
    labels.push(<span className="label">{moment().day(i).format('ddd')}</span>);
  }

  for (let i = firstDayDate.day(); i > 1; i--) {
    previousMonth.date(previousMonthDays - i + 2);

    days.push(
      <Day key={moment(previousMonth).format('DD MM YYYY')} onClick={(date) => onClick(date)} currentDate={date} date={moment(previousMonth)} startDate={startDate} endDate={endDate} />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    thisDate.date(i);

    days.push(
      <Day key={moment(thisDate).format('DD MM YYYY')} onClick={(date) => onClick(date)} currentDate={date} date={moment(thisDate)} startDate={startDate} endDate={endDate} />
    );
  }

  const daysCount = days.length;
  for (let i = 1; i <= (42 - daysCount); i++) {
    nextMonth.date(i);
    days.push(
      <Day key={moment(nextMonth).format('DD MM YYYY')} onClick={(date) => onClick(date)} currentDate={date} date={moment(nextMonth)} startDate={startDate} endDate={endDate} />
    );
  }

  return (
    <nav className="calendar--days">
      {days.concat()}
    </nav>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      startDate: moment().subtract(5, 'day'),
      endDate: moment().add(3, 'day')
    };
  }

  resetDate() {
    this.setState({
      date: moment()
    });
  }

  changeMonth(month) {
    const {date} = this.state;

    date.month(month);

    this.setState(
      date
    );
  }

  changeDate(date) {
    let {startDate, endDate} = this.state;

    if (startDate === null || date.isBefore(startDate, 'day') || ! startDate.isSame(endDate, 'day')) {
      startDate = moment(date);
      endDate = moment(date);
    } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
      startDate = null;
      endDate = null;
    } else if (date.isAfter(startDate, 'day')) {
      endDate = moment(date);
    }

    this.setState({
      startDate,
      endDate
    });
  }

  handleDateClick(date) {

  }

  render() {
    const {date, startDate, endDate} = this.state;
    return (
      <div className="calendar">
        <Heading date={date} changeMonth={(month) => this.changeMonth(month)} resetDate={() => this.resetDate()} />

        <Days onClick={(newDate) => {
          // NOTE: The selected date is not in current month
          if (!date.isSame(newDate, 'month')) {
            console.error('The date is not in current month');
            return;
          }

          this.changeDate(newDate)
        }} date={date} startDate={startDate} endDate={endDate} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calendar />,
  document.getElementById('calendar')
)
