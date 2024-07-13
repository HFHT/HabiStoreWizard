import { Carousel } from '@mantine/carousel';
import { Image, Menu, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAi, IconPhotoX, IconRestore } from '@tabler/icons-react';

interface ImageCarouselInterface {
    images: Iimg[]
    action: Function
    open: boolean
}
export function ImageCarousel({ images, action, open }: ImageCarouselInterface) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

    if (!open) return
    const theSelection = (theAction: any) => {
        action(theAction)
    }
    const slides = images.map((image: Iimg, idx: number) => (
        <Carousel.Slide key={image.url}>
            <Menu shadow="md" width={200} trigger="click" openDelay={100} closeDelay={0} closeOnItemClick >
                <Menu.Target>
                    <Image src={image.url} />
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Actions...</Menu.Label>
                    <div onClick={() => theSelection({ cmd: 'AI', img: image, idx: idx })}>
                        <Menu.Item leftSection={<IconAi style={{ width: 'rem(14)', height: 'rem(14)' }} onChange={(e: any) => console.log(e)} />}>
                            Analyze
                        </Menu.Item>
                    </div>
                    <div onClick={() => theSelection({ cmd: 'X', img: image, idx: idx })}>
                        <Menu.Item leftSection={<IconPhotoX style={{ width: 'rem(14)', height: 'rem(14)' }} />}>
                            Remove
                        </Menu.Item>
                    </div>
                    <div onClick={() => theSelection({ cmd: 'C', img: image, idx: idx })}>
                        <Menu.Item leftSection={<IconRestore style={{ width: 'rem(14)', height: 'rem(14)' }} />}>
                            Remove All
                        </Menu.Item>
                    </div>
                </Menu.Dropdown>
            </Menu >

        </Carousel.Slide >
    ))
    return (
        <>
            <Carousel slideSize={{ base: '50%', sm: '10%' }} align="start" slidesToScroll={mobile ? 1 : 2} slideGap={{ base: 'xl', sm: 2 }} controlsOffset="lg" controlSize={37} withIndicators>
                {slides}
            </Carousel>
            <Text size='xs'>Click on an Image to Analyze or remove.</Text>
        </>
    );
}