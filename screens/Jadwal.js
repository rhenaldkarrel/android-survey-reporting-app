import {
  Box,
  Button,
  Divider,
  HStack,
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
        <Box bg="primaryShade.800" p="6px" borderRadius="8px">
          <Heading fontSize="16px" fontWeight="medium">
            Adrian Sutanto
          </Heading>
          <Text>09.00-11.00</Text>
          <Text>14 Maret 2023</Text>
          <Divider my="8px" />
          <HStack display="flex" space="8px">
            <Button flex={1} variant="outline" borderColor="primary.400">
              Buka Lokasi
            </Button>
            <Button flex={1} bg="primary.400">
              Laporan Survey
            </Button>
          </HStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}