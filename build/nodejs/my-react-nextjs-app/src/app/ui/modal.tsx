import { Input as NextUIInput, 
	Button, 
	Modal, 
	ModalContent, 
	ModalHeader, 
	ModalBody, 
	ModalFooter,
	useDisclosure } from '@/app/lib/nextui';
import { useState } from 'react';

export default function ModalApp(props) {
	//console.log(props);
	//const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [modalPlacement, setModalPlacement] = useState("top-center");
	const [backdrop, setBackdrop] = useState("blur");
	return (
		<>
		<Modal
			isOpen={props.isOpen}
			placement={modalPlacement}
			onOpenChange={props.onOpenChange}
			backdrop={backdrop}
			size="md"
			isDismissable={false} 
			isKeyboardDismissDisabled={true}>
			<ModalContent>
				{
					(onClose) => (
						<>
						<ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
						<ModalBody>{props.body}</ModalBody>
						<ModalFooter>
							<Button color="primary" onPress={() => {
									if (props.type === "user"){
										return props.userId === undefined ? props.onValid() : props.onValid(props.userId);
									} else if (props.type === "book"){
										return props.bookId === undefined ? props.onValid() : props.onValid(props.bookId);
									}
								}}>
								Yes
							</Button>
							<Button color="danger" onPress={onClose}>
								No
							</Button>
						</ModalFooter>
						</>
					)
				}
			</ModalContent>
		</Modal>
		</>
	)
}	