import Image from "next/image";
import {
  Step,
  FeatureImage,
  FeatureSection,
  FeatureTextContainer,
} from "./components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="grid lg:grid-cols-2 grid-cols-1 items-center w-full bg-surface2 h-[calc(100vh-6.7rem)]">
        <div className="text-center h-full flex flex-col justify-center items-center">
          <h1 className="my-5">O problema que resolvemos</h1>
          <p className="">Uma breve descrição de como resolvemos o problema</p>
          <div className="flex justify-between p-2">
            <button className="bg-accent text-surface2  p-3 m-3 rounded-md">
              Botão de ação 1
            </button>
            <button className="bg-surface3 m-3 p-3 rounded-md">
              Botão de ação 2
            </button>
          </div>
        </div>
        <div className="lg:flex hidden justify-center items-center">
          <Image
            src="https://picsum.photos/400/400"
            alt="imagem"
            width={400}
            height={400}
            className="h-[400px]"
          />
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-center items-center">
          <h6>Como funciona</h6>
          <h3>Crie atividades para os seus estudantes</h3>
        </div>
        <div className="lg:w-[70%] w-[90%] my-5 mx-auto flex md:flex-row flex-col justify-around items-center md:[&>:nth-child(even)>img]:order-none [&>:nth-child(even)>img]:order-first">
          <Step
            title={1}
            description={"Crie uma atividade"}
            imageSrc={"https://picsum.photos/200/400"}
          />
          <Step
            title={2}
            description={"Seu estudante realiza a atividade"}
            imageSrc={"https://picsum.photos/200/400"}
          />
          <Step
            title={3}
            description={"Dê feedback"}
            imageSrc={"https://picsum.photos/200/400"}
          />
        </div>
      </section>
      <FeatureSection>
        <FeatureTextContainer>
          <h3 className="my-5">Crie atividades interativas</h3>
          <ul className="list-disc">
            <li className="">Primeiro item</li>
            <li className="">Primeiro item</li>
            <li className="">Primeiro item</li>
          </ul>
        </FeatureTextContainer>
        <FeatureImage src={""} />
      </FeatureSection>
      <FeatureSection>
        <FeatureImage src={""} />
        <FeatureTextContainer>
          <h3 className="my-5">Dê feedback em cada resposta</h3>
          <ul className="list-disc">
            <li className="">Primeiro item</li>
            <li className="">Primeiro item</li>
            <li className="">Primeiro item</li>
          </ul>
        </FeatureTextContainer>
      </FeatureSection>
    </main>
  );
}
