import {
	AspectRatio,
	Button,
	FormControl,
	HStack,
	Image,
	Input,
	Modal,
	ScrollView,
	VStack,
} from 'native-base';
import { Fragment, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function BuktiDokumen({ debiturId }) {
	const [photos, setPhotos] = useState([{ title: '', uri: '' }]);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

	const pickImage = async (index) => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
			allowsMultipleSelection: false,
		});

		console.log(result);

		if (!result.canceled) {
			let data = [...photos];
			data[index]['uri'] = result.assets[0].uri;
			setPhotos(data);
		}
	};

	const handleFormChange = (text, index) => {
		let data = [...photos];
		data[index]['title'] = text;
		setPhotos(data);
	};

	const addPhotos = () => {
		let object = {
			title: '',
			image: '',
		};

		setPhotos([...photos, object]);
	};

	const handleSave = () => {
		console.log(JSON.stringify(photos, null, 2));
	};

	const handleDeleteImage = (index) => {
		let data = [...photos];
		data[index]['uri'] = '';
		setPhotos(data);
	};

	const handlePreviewImage = (image) => {
		setShowModal(true);
		setSelectedImage(image);
	};

	return (
		<ScrollView m='16px'>
			<Button onPress={addPhotos} mb='20px'>
				Tambah Bukti Dokumen
			</Button>
			<VStack space='12px'>
				{photos.map((photo, index) => (
					<FormControl key={index}>
						<FormControl.Label>Nama Dokumen {index + 1}</FormControl.Label>
						<Input
							value={photo.title}
							onChangeText={(text) => handleFormChange(text, index)}
							mb='12px'
							name='title'
						/>
						{photo.uri ? (
							<Fragment>
								<AspectRatio ratio={4 / 3}>
									<Image
										alt={photo.uri}
										source={{ uri: photo.uri }}
										resizeMode='contain'
									/>
								</AspectRatio>
								<HStack space='8px' mt='8px' justifyContent='center'>
									<Button onPress={() => handlePreviewImage(photo.uri)}>
										Lihat
									</Button>
									<Button
										colorScheme='red'
										onPress={() => handleDeleteImage(index)}
									>
										Hapus
									</Button>
								</HStack>
							</Fragment>
						) : (
							<Button onPress={() => pickImage(index)}>
								Unggah gambar bukti dokumen
							</Button>
						)}
					</FormControl>
				))}
				<Button onPress={handleSave}>Simpan Data</Button>
			</VStack>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content>
					<Modal.CloseButton bg='gray.300' />
					<Modal.Header>Preview Gambar</Modal.Header>
					<Image
						source={{ uri: selectedImage }}
						resizeMode='contain'
						alt={selectedImage}
						style={{ width: '100%', height: '100%' }}
					/>
				</Modal.Content>
			</Modal>
		</ScrollView>
	);
}
