import {
  Heading,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {
  dayNames,
  dayNamesShort,
  monthNames,
  monthNamesShort,
} from '../lib/constants';
import { StatusBar } from 'react-native';
import DebiturCard from '../components/DebiturCard';

LocaleConfig.locales['id'] = {
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
  today: 'Hari Ini',
};
LocaleConfig.defaultLocale = 'id';

export default function Jadwal() {
  return (
    <ScrollView marginTop={StatusBar.currentHeight}>
      <Calendar
        onDayPress={day => {
          console.log('selected day', day);
        }}
        hideArrows={true}
        disableAllTouchEventsForDisabledDays={true}
        renderHeader={date => {
          const dateObj = new Date(date);
          const year = dateObj.getFullYear();
          const month = monthNames[dateObj.getMonth()];
          return (
            <Text py="12px" fontSize="16px" fontWeight="medium">
              {month} {year}
            </Text>
          );
        }}
      />
      <VStack space="8px" m="16px">
        <Heading fontWeight="medium" fontSize="16px">
          Jadwal Hari Ini
        </Heading>
        <DebiturCard />
      </VStack>
    </ScrollView>
  );
}