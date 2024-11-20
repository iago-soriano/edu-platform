import Image from "next/image";
import {
  NotebookPen,
  Sparkle,
  SquareUserRound,
  ListChecks,
} from "lucide-react";
import { Button } from "@components/ui/Button";
import { VideoContent } from "@components/Video/video";
import { ScrollArea, ScrollBar } from "@components/ui/ScrollArea";
import { BenefitsCard } from "./BenefitsCard";
import { TestimonialCard } from "./TestimonialCard";
import { FeatureItem } from "./FeatureItem";
import { FAQQuestion } from "./FAQQuestion";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
} from "@components/ui/Carousel";

const benefitsIcons = {
  Notebook: <NotebookPen size={100} />,
  Teacher: <SquareUserRound size={100} />,
  Activity: <ListChecks size={100} />,
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-[90%] gap-10 mx-10">
      <section
        id="hero"
        className="grid ml-10 lg:grid-cols-2 grid-cols-1  w-[100%] min-h-[calc(100vh-6.7rem)]"
      >
        <div className="h-full flex flex-col justify-center items-start w-full">
          <h1 className="my-5 text-6xl font-medium w-full">
            O problema que resolvemos
          </h1>
          <p className="text-3xl font-normal mt-5 w-full">
            Uma breve descrição de como resolvemos o problema
          </p>
          <Button variant="primary" className="mt-10">
            Botãozin Bonitin
          </Button>
          <div className="flex flex-col justify-between items-start mt-8 self-start">
            <p className="p-3 m-3 rounded-md flex items-center gap-3">
              {" "}
              <Sparkle size={20} />
              Bullet point
            </p>
            <p className="p-3 m-3 rounded-md flex items-center gap-3">
              {" "}
              <Sparkle size={20} />
              Bullet point
            </p>
          </div>
        </div>
        <div className="hidden justify-center items-center mt-10 ml-5 lg:block  lg:self-center lg:justify-self-center">
          <Image
            src="https://picsum.photos/400/400"
            alt="imagem"
            width={400}
            height={400}
            className="h-[400px] lg:block hidden"
          />
        </div>
      </section>
      <section
        id="solution"
        className="grid lg:grid-cols-2 grid-cols-1 items-center w-full h-[100%] mt-10 gap-10"
      >
        <div className="flex flex-col justify-center items-center">
          <VideoContent url="https://www.youtube.com/watch?v=P-WNLRsLlvE&ab_channel=DarrenMcGrady" />
        </div>
        <div className="lg:w-[90%] ml-10 mt-5 mx-auto flex flex-col md:justify-around items-center md:[&>:nth-child(even)>img]:order-none [&>:nth-child(even)>img]:order-first">
          <p className="mb-10 text-xl">
            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>{" "}
            Molestiae ipsam esse omnis iste id accusantium libero, commodi cum
            obcaecati, ut nesciunt consequuntur facilis impedit ex excepturi
            necessitatibus consectetur? Numquam, hic! Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>

          <p className="mb-5 text-base">
            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>{" "}
            Molestiae ipsam esse omnis iste id accusantium libero, commodi cum
            obcaecati, ut nesciunt consequuntur facilis impedit ex excepturi
            necessitatibus consectetur? Numquam, hic! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quidem, deleniti omnis fuga animi sit
            commodi autem architecto perspiciatis rerum temporibus accusamus
            ipsum impedit quisquam! Impedit laudantium sequi rerum laboriosam.
            Quia!
          </p>
          <p className="mb-5 text-base">
            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>{" "}
            Molestiae ipsam esse omnis iste id accusantium libero, commodi cum
            obcaecati, ut nesciunt consequuntur facilis impedit ex excepturi
            necessitatibus consectet ur? Numquam, hic! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quidem, deleniti omnis fuga animi
            sit commodi autem architecto perspiciatis rerum temporibus accusamus
            ipsum impedit quisquam! Impedit laudantium sequi rerum laboriosam.
            Quia!
          </p>
        </div>
      </section>
      <section id="how-it-works" className="h-[100%] w-full mt-10 flex">
        <BenefitsCard
          icon={benefitsIcons.Teacher}
          title="título"
          description="descrição"
        />
        <BenefitsCard
          icon={benefitsIcons.Notebook}
          title="título"
          description="descrição"
        />
        <BenefitsCard
          icon={benefitsIcons.Activity}
          title="título"
          description="descrição"
        />
      </section>
      <section id="testimonials" className="min-h-[70vh] w-full mt-15 mx-10">
        <div className="flex flex-col justify-center items-center gap-5 w-[90%] h-[90%] mt-10">
          <h3 className="text-2xl text-[#c2470a] font-semibold">
            Testimonials
          </h3>
          <Carousel
            plugins={[
              AutoScroll({
                speed: 1,
              }),
            ]}
            carouselOptions={{
              loop: true,
            }}
          >
            <CarouselMainContainer className="h-60">
              {Array.from({ length: 5 }).map((_, index) => (
                <SliderMainItem key={index} className="bg-transparent">
                  <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background">
                    Slide {index + 1}
                  </div>
                </SliderMainItem>
              ))}
            </CarouselMainContainer>
          </Carousel>

          {/* <ScrollAreaPrimitive.Root
            type="always"
            style={{ height: "50%", overflow: "hidden", width: "100%" }}
          >
            <ScrollAreaPrimitive.Viewport
              style={{ overflowX: "auto", height: "100%", width: "100%" }}
            >
              <div className=" flex w-[250%] h-[70%] gap-10 flex-row justify-center items-center">
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
              </div>
            </ScrollAreaPrimitive.Viewport>
            <ScrollAreaPrimitive.Scrollbar
              orientation="horizontal"
              className="ScrollAreaScrollbar"
              style={{ height: "20px", marginTop: "20px" }}
            >
              <ScrollAreaPrimitive.Thumb
                className="ScrollAreaThumb"
                style={{
                  backgroundColor: "#888",
                  borderRadius: "4px",
                  height: "10px",
                }}
              />
            </ScrollAreaPrimitive.Scrollbar>
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root> */}
        </div>
      </section>
      <section id="features" className="min-h-[50vh] w-full mt-10 mx-8">
        <h3 className="text-2xl text-[#c2470a] font-semibold text-center mb-6">
          Features{" "}
        </h3>{" "}
        <div className="flex flex-col gap-3">
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
      <section id="faqs" className="min-h-[70vh] w-full mt-15 mx-8">
        <h3 className="text-2xl text-[#c2470a] font-semibold text-center mb-6">
          FAQs{" "}
        </h3>{" "}
        <div className="flex flex-col gap-3">
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
    </main>
  );
}
