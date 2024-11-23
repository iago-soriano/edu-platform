import { Button } from "@components/ui/Button";
import { VideoContent } from "@components/Video/video";
import {
  ListChecks,
  NotebookPen,
  Sparkle,
  SquareUserRound,
} from "lucide-react";
import Image from "next/image";
import { BenefitsCard } from "./BenefitsCard";
import { FAQQuestion } from "./FAQQuestion";
import { FeatureItem } from "./FeatureItem";
import { TestimonialCard } from "./TestimonialCard";
import { EmblaCarousel } from "./TestimonialCard/Carousel";

const HeroBulletPoint = ({ children }) => {
  return (
    <p className="m-1 rounded-md flex items-center gap-1">
      <Sparkle size={20} />
      {children}
    </p>
  );
};
export default function Home() {
  return (
    <div className="flex flex-col">
      <section
        id="hero"
        className="grid container mx-auto lg:grid-cols-2 grid-cols-1 h-[calc(100vh-4rem)]"
      >
        <div className="h-full flex flex-col justify-center items-start mt-5 ">
          <h1 className="text-7xl font-medium w-full">
            O problema que resolvemos
          </h1>
          <p className="mt-8 text-2xl font-normal w-full">
            Uma breve descrição de como resolvemos o problema
          </p>
          <Button variant="primary" className="mt-8">
            Botãozin Bonitin
          </Button>
          <div className="flex flex-col justify-between items-start mt-8 self-start">
            <HeroBulletPoint>Plataforma muito legal</HeroBulletPoint>
            <HeroBulletPoint>Legal mesmo</HeroBulletPoint>
          </div>
        </div>
        <div className="hidden justify-center items-center lg:block lg:self-center lg:justify-self-end">
          <Image
            src="https://picsum.photos/400/400"
            alt="imagem"
            width={400}
            height={400}
            className="h-[400px] lg:block hidden"
          />
        </div>
      </section>
      <div id="how-it-works" />
      <section className="grid lg:grid-cols-2 grid-cols-1 items-center container mx-auto gap-8 place-content-center my-36">
        <VideoContent url="https://www.youtube.com/watch?v=P-WNLRsLlvE&ab_channel=DarrenMcGrady" />
        <div className="lg:w-[90%] mx-auto flex flex-col md:justify-around items-center">
          <p className="text-xl">
            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>{" "}
            Molestiae ipsam esse omnis i
          </p>

          <p className="mt-10 text-base">
            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>{" "}
            Molestiae ipsam esse omnis iste id accusantium libero, commodi cum
            obcaecati,
          </p>
          <p className="mt-10 text-base">
            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>{" "}
            Molestiae ipsam esse omnis iste id accusantium libero, commodi cum
            obcaecati, ut n
          </p>
        </div>
      </section>
      <section className="my-36 flex md:flex-row flex-col container mx-auto gap-8">
        <BenefitsCard
          icon={<SquareUserRound size={100} />}
          title="título"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          minus soluta beatae commodi rerum incidunt nobis sit et perspiciatis
          temporibus quas, quaerat consectetur vel? Accusamus error ratione nam
          autem magnam?"
        />
        <BenefitsCard
          icon={<NotebookPen size={100} />}
          title="título"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          minus soluta beatae commodi rerum incidunt nobis sit et perspiciatis
          temporibus quas, quaerat consectetur vel? Accusamus error ratione nam
          autem magnam?"
        />
        <BenefitsCard
          icon={<ListChecks size={100} />}
          title="título"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          minus soluta beatae commodi rerum incidunt nobis sit et perspiciatis
          temporibus quas, quaerat consectetur vel? Accusamus error ratione nam
          autem magnam?"
        />
      </section>
      <section className="my-36 flex flex-col">
        {/* <h2 className="text-2xl text-[#c2470a] font-semibold mb-14 text-center">
          Testimonials
        </h2> */}
        <EmblaCarousel
          slides={[
            <TestimonialCard />,
            <TestimonialCard />,
            <TestimonialCard />,
            <TestimonialCard />,
          ]}
        />
      </section>
      <section className="my-36 container mx-auto px-16">
        {/* <h2 className="text-2xl text-[#c2470a] font-semibold mb-14 text-center">
          Features{" "}
        </h2>{" "} */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FeatureItem
            featureName="fazer atividade"
            featureDescription="pipipipopopopipipipopopo"
          />
          <FeatureItem
            featureName="responder atividade"
            featureDescription="pipipipopopopipipipopopo"
          />
          <FeatureItem
            featureName="dar feedback para o estudante"
            featureDescription="pipipipopopopipipipopopo"
          />
          <FeatureItem
            featureName="ser mais feliz"
            featureDescription="pipipipopopopipipipopopo"
          />
          <FeatureItem
            featureName="ser mais produtivo"
            featureDescription="pipipipopopopipipipopopo"
          />
          <FeatureItem
            featureName="ter mais tempo para cheirar as flores"
            featureDescription="pipipipopopopipipipopopo"
          />
          <FeatureItem
            featureName="rir das respostas dos estudantes sem ser na cara dele"
            featureDescription="pipipipopopopipipipopopo"
          />
        </div>
      </section>
      <div id="faqs" />
      <section className="my-36 container mx-auto">
        <h2 className="text-2xl text-primary font-semibold mb-14 text-center">
          Frequently asked questions{" "}
        </h2>{" "}
        <div className="flex flex-col gap-3 font-body">
          <FAQQuestion question="Como fazer atividade?" answer="pipipipopopo" />
          <FAQQuestion
            question="Como se cadastrar na plataforma?"
            answer="pipipipopopo"
          />
          <FAQQuestion
            question="Como responder atividade?"
            answer="pipipipopopo"
          />
          <FAQQuestion
            question="Como pagar mais que o pedido por essa plataforma maravilhosa?"
            answer="pipipipopopo"
          />
          <FAQQuestion
            question="Como ver o feedback do meu professor?"
            answer="pipipipopopo"
          />
          <FAQQuestion
            question="Como contratar vocês por um milhão de dólares ao mês?"
            answer="pipipipopopo"
          />
        </div>
      </section>
      <div id="pricing" />
      <section></section>
    </div>
  );
}
