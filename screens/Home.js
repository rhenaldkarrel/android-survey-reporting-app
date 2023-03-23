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
import useAuth from '../hooks/useAuth';
import { StatusBar } from 'react-native';

export default function Home() {
  const { auth } = useAuth();

  return (
    <ScrollView backgroundColor="primary.400" marginTop={StatusBar.currentHeight}>
      <Box p="16px">
        <Text fontWeight="medium" fontSize="18px" color="white">
          Halo, {auth.name}!
        </Text>
      </Box>
      <VStack
        backgroundColor="white"
        padding="12px"
        space="12px"
        paddingBottom="24px"
        borderTopLeftRadius="16px"
        borderTopRightRadius="16px">
        <Box>
          <Heading fontSize="16px" fontWeight="medium">
            Statistik Survey
          </Heading>
        </Box>
        <VStack space="8px">
          <HStack space="8px" display="flex">
            <Box bg="primaryShade.800" p="6px" flex={1} borderRadius="8px">
              <Text>Total Survey Aktif</Text>
              <Text fontSize="48px">15</Text>
            </Box>
            <Box bg="primaryShade.800" p="6px" flex={1} borderRadius="8px">
              <Text>Total Survey Sedang Diisi</Text>
              <Text fontSize="48px">15</Text>
            </Box>
          </HStack>
          <HStack space="8px" display="flex">
            <Box bg="primaryShade.800" p="6px" flex={1} borderRadius="8px">
              <Text>Total Survey Selesai</Text>
              <Text fontSize="48px">15</Text>
            </Box>
            <Box bg="primaryShade.800" p="6px" flex={1} borderRadius="8px">
              <Text>Total Survey Dibatalkan</Text>
              <Text fontSize="48px">15</Text>
            </Box>
          </HStack>
        </VStack>
        <Box>
          <Heading fontSize="16px" fontWeight="medium">
            Statistik Debitur
          </Heading>
        </Box>
        <VStack space="8px">
          <HStack space="8px" display="flex">
            <Box bg="primaryShade.800" p="6px" flex={1} borderRadius="8px">
              <Text>Total Debitur</Text>
              <Text fontSize="48px">15</Text>
            </Box>
            <Box bg="primaryShade.800" p="6px" flex={1} borderRadius="8px">
              <Text>Total Pencairan</Text>
              <Text fontSize="48px">15</Text>
            </Box>
          </HStack>
          <HStack space="8px" display="flex">
            <Box bg="primaryShade.800" p="6px" flex={1} borderRadius="8px">
              <Text>Total Debitur Bulan Ini</Text>
              <Text fontSize="48px">15</Text>
            </Box>
            <Box bg="primaryShade.800" p="6px" flex={1} borderRadius="8px">
              <Text>Total Pencairan Bulan Ini</Text>
              <Text fontSize="48px">15</Text>
            </Box>
          </HStack>
        </VStack>
        <Box>
          <Heading fontSize="16px" fontWeight="medium">
            Agenda Survey Hari Ini
          </Heading>
        </Box>
        <VStack space="8px">
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
      </VStack>
    </ScrollView>
  );
}