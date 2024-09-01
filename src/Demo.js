import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';

import { LocalizationProvider } from '@mui/x-date-pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  Toolbar,
  ViewSwitcher,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

import { pl } from 'date-fns/locale';
//import { appointments } from '../../../demo-data/appointments';
import { firestore } from './firebase'; // Adjust the import path


const appointments = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  ];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      //currentDate: '2018-06-27',
      currentDate: new Date().toISOString().split('T')[0], // Set currentDate to today's date

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
    } = this.state;

    return (

      <LocalizationProvider dateAdapter={DateFnsUtils} locale={pl}>
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <WeekView
            startDayHour={9}
            endDayHour={17}
          />
           <MonthView />
           <DayView />



          <Toolbar />
          <ViewSwitcher
           messages={{
            dayViewLabel: 'Dzień',
            weekViewLabel: 'Tydzień',
            monthViewLabel: 'Miesiąc',
          }} />
          <AllDayPanel 
          messages={{
            allDay: 'Cały dzień',
          }}/>
          <EditRecurrenceMenu />
          <ConfirmationDialog 
            messages={{
              confirmDeleteMessage: 'Czy na pewno chcesz usunąć to spotkanie?',
              confirmCancelMessage: 'Czy na pewno chcesz anulować edycję?',
            }}/>
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
            messages={{
              openButton: 'Otwórz',
              deleteButton: 'Usuń',
              allDayLabel: 'Cały dzień',
            }}
          />
          <AppointmentForm 
          messages={{
            detailsLabel: 'Szczegóły',
            allDayLabel: 'Cały dzień',
            titleLabel: 'Tytuł',
            commitCommand: 'Zapisz',
            moreInformationLabel: 'Więcej informacji',
            repeatLabel: 'Powtarzaj',
            notesLabel: 'Notatki',
          }} />
        </Scheduler>
      </Paper>

      </LocalizationProvider>
    );
  }
}
