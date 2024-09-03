import * as React from 'react';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { pl } from 'date-fns/locale';
import { getDatabase, ref, set, push, update, remove, get } from "firebase/database";
import { database } from './firebase';

const defaultAppointments = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

let addedDate = 0;

// External view switcher component
const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: 'row' }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Week" control={<Radio />} label="Tydzień" />
    <FormControlLabel value="Day" control={<Radio />} label="Dzień" />
    <FormControlLabel value="Month" control={<Radio />} label="Miesiąc" />
  </RadioGroup>
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: defaultAppointments, 
      currentViewName: 'Week', // Default view
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.loadAppointments = this.loadAppointments.bind(this);
  }

  async componentDidMount() {
    await this.loadAppointments();
  }

  async loadAppointments() {
    try {
      const database = getDatabase(); 
      const appointmentsRef = ref(database, 'appointments');
      const snapshot = await get(appointmentsRef);
      
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([id, value]) => ({
          id,
          ...value,
        }));
        this.setState({ data });
      } else {
        this.setState({ data: defaultAppointments }); 
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  }

  async commitChanges({ added, changed, deleted }) {
    const database = getDatabase();
    
    this.setState((state) => {
      let { data } = state;
  
      if (changed) {
        Object.keys(changed).forEach(id => {
          const appointmentRef = ref(database, `appointments/${id}`);
          update(appointmentRef, changed[id])
            .catch(error => console.error('Error updating appointment:', error));
  
          data = data.map(appointment =>
            appointment.id === id ? { ...appointment, ...changed[id] } : appointment
          );
        });
      }
  
      if (added) {
        
        const now = new Date().getTime();
        if(now-addedDate > 5000 )
        {
          addedDate = now;
          
          const newAppointmentRef = push(ref(database, 'appointments'));
          const newAppointment = {
            allDay: added.allDay,
            startDate: added.startDate.toISOString(),
            endDate: added.endDate.toISOString(),
            title: added.title,
          };
          
          console.log('Adding appointment:', added); 
    
          set(newAppointmentRef, newAppointment)
            .catch(error => console.error('Error adding appointment:', error));
    
          data = [...data, { id: newAppointmentRef.key, ...newAppointment }];
        }
       
      }
  
      if (deleted !== undefined) {
        const appointmentRef = ref(database, `appointments/${deleted}`);
        remove(appointmentRef)
          .catch(error => console.error('Error deleting appointment:', error));
        
        data = data.filter(appointment => appointment.id !== deleted);
      }
  
      return { data };
    });
  }

  handleViewChange(event) {
    this.setState({ currentViewName: event.target.value });
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

  render() {
    const {
      currentDate, data, currentViewName, addedAppointment, appointmentChanges, editingAppointment,
    } = this.state;

    return (
      <LocalizationProvider dateAdapter={DateFnsUtils} locale={pl}>
        <React.Fragment>
          <ExternalViewSwitcher
            currentViewName={currentViewName}
            onChange={this.handleViewChange}
          />
     
          <Paper>
            <Scheduler data={data} height={660}>
              <ViewState
                currentDate={currentDate}
                currentViewName={currentViewName}
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
              <WeekView startDayHour={9} endDayHour={17} />
              <MonthView />
              <DayView />
              <Toolbar />
              <DateNavigator />
              <AllDayPanel messages={{ allDay: 'Cały dzień' }} />
              <EditRecurrenceMenu />
              <ConfirmationDialog 
                messages={{
                  confirmDeleteMessage: 'Czy na pewno chcesz usunąć to spotkanie?',
                  confirmCancelMessage: 'Czy na pewno chcesz anulować edycję?',
                  cancelButton: 'Anuluj',
                  discardButton: 'Odrzuć'

                }}
              />
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
                recurringIconComponent = {null}
                messages={{
                  detailsLabel: 'Szczegóły',
                  allDayLabel: 'Cały dzień',
                  titleLabel: 'Tytuł',
                  commitCommand: 'Zapisz',
                  moreInformationLabel: 'Więcej informacji',
                  repeatLabel: 'Powtarzaj',
                  notesLabel: 'Notatki',
                }} 
              />
            </Scheduler>
          </Paper>
        </React.Fragment>
      </LocalizationProvider>
    );
  }
}