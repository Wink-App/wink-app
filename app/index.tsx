import { useRouter } from "expo-router";

import { useCallback, useEffect, useMemo, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import SafeAreaLayout from "../appLayouts/SafeAreaLayout";

import { ButtonText } from "../components/elements/Button";
import TransitionElement from "../components/transitions/TransitionElement";
import AppText from "@/components/app/AppText";
import AppView from "@/components/app/AppView";
import { HorizontalScroll } from "@/components/wrappers/Scroll";
import { windowWidth } from "../utils/utils";

import { colorOrange, colorWhite } from "../utils/styles";

type SlideProps = {
  id?: number;
  text: {
    firstLine: string;
    secondLine: string;
    body: string;
  };
};

export default function Index() {
  const router = useRouter();

  const slides: SlideProps[] = useMemo(() => [
    {
      id: 0,
      text: {
        firstLine: "Benvenuto",
        secondLine: "su Wink",
        body: "L'app che ti darà la possibilità\ndi fare shopping online e\nricevere i tuoi ordini entro\n60 minuti ovunque tu voglia!"
      }
    },
    {
      id: 1,
      text: {
        firstLine: "Acquista con",
        secondLine: "semplicità",
        body: "Accedi o registrati, dopodiché\navrai a disposizione gli articoli\ndei negozi affiliati, in una\npiattaforma a portata di mano!"
      }
    },
    {
      id: 2,
      text: {
        firstLine: "Non è mai stato",
        secondLine: "così veloce",
        body: "Una volta aver effettuato l'acquisto,\nriceverai il tuo ordine entro\n60 minuti e avrai acquistato\ncomodamente da casa o ufficio!"
      }
    },
  ], []);

  const [idCurrentSlide, setIdCurrentSlide] = useState<number>(slides[0].id);
  const [hasReachedLastSlide, setHasReachedLastSlide] = useState(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      let slide = Math.ceil(event.nativeEvent.contentOffset.x / windowWidth);
      slide = Math.max(0, Math.min(slide, slides.length - 1));
      if (slide !== idCurrentSlide) {
        setIdCurrentSlide(slide);
      }
    },
    [idCurrentSlide],
  );

  useEffect(() => {
    if (idCurrentSlide === slides.length - 1) {
      setHasReachedLastSlide(true);
    }
  }, [idCurrentSlide]);

  const handleNavigateToRegister = useCallback(() => {
    router.push("/auth/");
  }, []);

  return (
    <AppView
      height100
      backgroundColorPurple>
      <SafeAreaLayout>
        <AppView height100 flexColumnCenter>
          <AppView height={325}>
            <HorizontalScroll
              pagingEnabled
              onScroll={handleScroll}>
              {slides.map((slide) => (
                <Slide key={slide.id} text={slide.text} />
              ))}
            </HorizontalScroll>
          </AppView>
          <AppView flexRowCenter height={10} gap={20}>
            {slides.map((slide, index) => (
              <AppView
                key={slide.id}
                width={10}
                height={10}
                borderRadius={5}
                backgroundColor={
                  idCurrentSlide === index
                    ? colorOrange
                    : colorWhite
                }
              />
            ))}
          </AppView>
          <AppView flexRowCenter height={30} marginTop={50}>
            {hasReachedLastSlide && (
              <TransitionElement>
                <ButtonText
                  style={{ height: 50 }}
                  onPress={handleNavigateToRegister}>
                  <AppText altFont="Bogart" big secondaryLight lineHeight={24}>Avanti</AppText>
                </ButtonText>
              </TransitionElement>
            )}
          </AppView>
        </AppView>
      </SafeAreaLayout >
    </AppView>
  );
}

function Slide({ text }: SlideProps) {
  return (
    <AppView windowWidth flexColumnStartLeft height={300} paddingHorizontal={30}>
      <AppText altFont="Bogart" bold altFontSize={38} lineHeight={50} altColor={colorOrange}>{text.firstLine}</AppText>
      <AppText altFont="Bogart" bold altFontSize={38} lineHeight={50} altColor={colorOrange}>{text.secondLine}</AppText>
      <AppText altFont="Bogart" altFontSize={20} lineHeight={30} white marginTop={20}>{text.body}</AppText>
    </AppView>
  );
}
