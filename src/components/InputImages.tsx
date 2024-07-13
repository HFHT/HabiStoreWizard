import { Button, FileButton, Group, HoverCard, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

interface InputImagesInterface {
    images: Iimg[]
    setImages: Function
    toggleInfo: Function
}
export default function InputImages({ images, setImages, toggleInfo }: InputImagesInterface) {
    const setFiles = (files: any) => {
        console.log(files)
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue
            if (!images.some((e: any) => e.name === files[i].name)) {
                setImages((prevImages: any) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        blob: files[i]
                    }
                ])
            }
        }
    }
    return (
        <>
            <FileButton onChange={setFiles} accept="image/*" multiple>
                {(props) =>
                    <>
                        <Button {...props}>Upload Images</Button>
                        <Group justify='center'>
                            <HoverCard width={280} shadow="md">
                                <HoverCard.Target>
                                    <IconInfoCircle />
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <Text size="sm">
                                        The best results are when the manufacturer logo/name is clear and
                                        the product is at an angle so it can estimate height, width, and depth.                                    </Text>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        </Group>
                    </>}
            </FileButton>
        </>
    )
}
