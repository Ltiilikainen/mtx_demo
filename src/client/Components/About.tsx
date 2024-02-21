import ColumnWrapper from "./Elements/Wrappers/ColumnWrapper";
import PageContentWrapper from "./Elements/Wrappers/PageContentWrapper";
import RowWrapper from "./Elements/Wrappers/RowWrapper";

export default function About() {
  return (
    <PageContentWrapper pageTitle="About">
      <ColumnWrapper gap="4">
        <p>
          Lorem excepteur dolore duis culpa ad sunt aute commodo pariatur
          incididunt ut. Deserunt sint labore do ea Lorem minim aliqua proident
          esse do consequat. Consequat aute ea magna commodo do reprehenderit.
          Enim duis irure ullamco aliqua veniam. Irure minim qui tempor elit
          cupidatat exercitation fugiat pariatur quis.
        </p>

        <p>
          Enim mollit voluptate pariatur ipsum esse proident tempor aliqua id
          excepteur ullamco irure et ex. Nulla dolore voluptate in nulla aute
          pariatur enim sint ex culpa sunt ipsum sint. Aliquip anim eu consequat
          est in incididunt sunt adipisicing magna reprehenderit est.
          Adipisicing et tempor anim id dolore ex aliquip tempor mollit fugiat
          ad. Dolore et sint irure adipisicing officia nulla deserunt dolore
          nisi. Incididunt aute irure enim velit. Dolor cillum exercitation sint
          aliqua nisi.
        </p>
        <RowWrapper breakPoint="sm">
          <ColumnWrapper
            gap="2"
            className="items-center border-b-[2px] sm:w-[50%] sm:border-b-0 sm:border-r-[2px] border-slate-600"
          >
            <div className="w-40 h-40 bg-slate-300 rounded-full overflow-hidden"></div>
            <h3>Name McPerson</h3>
          </ColumnWrapper>
          <ColumnWrapper
            gap="2"
            className="px-4"
          >
            <p>Address line 1</p>
            <p>Address line 2</p>
            <p>00000 CITY</p>
            <p>COUNTRY</p>
          </ColumnWrapper>
        </RowWrapper>
      </ColumnWrapper>
    </PageContentWrapper>
  );
}
