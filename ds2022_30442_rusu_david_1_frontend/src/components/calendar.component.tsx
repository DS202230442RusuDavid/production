import { Paper } from "@mui/material";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import green from "@material-ui/core/colors/green";
import enLocale from "date-fns/locale/en-US";
import DateFnsUtils from "@date-io/date-fns";

interface Props {
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
    selectedDate: Date
}

const CalendarComp = ({setSelectedDate,selectedDate}: Props) => {

    const theme = createTheme({
        palette: {
          primary: { light: green[300], main: green[500], dark: green[700] }
        }
    });

    const localeMap: any = {
        en: enLocale,
      };

    const locale = "en";
    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        console.log("Date is: ", date);
    };

    class Utils extends DateFnsUtils {
        getWeekdays = () => {
          return ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
        }
      }

    return (
        <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
          <Paper style={{ overflow: "hidden" }}>
            <Calendar date={selectedDate} onChange={handleDateChange} />
          </Paper>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
      );
};


export default CalendarComp;