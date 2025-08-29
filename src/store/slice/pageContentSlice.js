import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASEURL;

export const fetchPageContent = createAsyncThunk(
  "pageContent/fetchPageContent",
  async (pageName) => {
    let url = "";

    if (pageName === "nav") {
      url = `${baseUrl}/nav-bar?populate=quickLinks&populate=menus.logo&populate=menus.items.items`;
    }

    if (pageName === "footer") {
      url = `${baseUrl}/footer?populate=links.items&populate=contactDetails&populate=branding.socialMedia.icon&populate=branding.logo&populate=subscribe&populate=copyRight&populate=copyRight.items`;
    }

    if (pageName === "aboutUs") {
      url = `${baseUrl}/about-us?populate=heroSlider.image&populate=overview&populate=visionMission.ourMission&populate=visionMission.ourVision.images&populate=ourMandate.items.image&populate=governanceManagement.banner&populate=governanceManagement.link&populate=boardOfDirectors.items.image&populate=boardOfDirectors.link&populate=historyLegacy.items.items&populate=historyLegacy.link`;
    }

    if (pageName === "pressRelease") {
      url = `${baseUrl}/press-release?populate=heroSlider.image&populate=note.backgroundImage&populate=pressRelease.items.items.items.file`;
    }

    if (pageName === "publication") {
      url = `${baseUrl}/publication?populate=heroSlider.image&populate=note.backgroundImage&populate=items.items.items.items.file`;
    }

    if (pageName === "newsAndPublication") {
      url = `${baseUrl}/news-and-publication?populate=heroSection&populate=contactDetails&populate=events.image&populate=category.shortNote.link`;
    }

    if (pageName === "latestPressRelease") {
      url = `${baseUrl}/press-release/findLatestCategoryData?category=Press Releases`;
    }

    if (pageName === "latestGovernorSpeeches") {
      url = `${baseUrl}/press-release/findLatestCategoryData?category=Governor Speeches`;
    }

    if (pageName === "latestPublication") {
      url = `${baseUrl}/publication/findLatestData`;
    }

    if (pageName === "home") {
      url = `${baseUrl}/home?populate=heroSlider.backgroundImage&populate=exchangeRates.exchangeRates&populate=quote.icon&populate=FAQ.backgroundImage&populate=FAQ.FAQ`;
    }

    if (pageName === "financialInfrastructureInnovation") {
      url = `${baseUrl}/financial-infrastructure-and-innovation?populate=heroCard.image&populate=overview.image&populate=faqSection.faq&populate=legalAndRegulatoryFramework.image&populate=legalAndRegulatoryFramework.leftSection&populate=legalAndRegulatoryFramework.rightSection&populate=specificLegalAndRegulatoryInstruments.category.items`;
    }

    if (pageName === "currencyManagement") {
      url = `${baseUrl}/currency-management?populate=heroCard.image&populate=banknotesCoins.backgroundImage&populate=cleanMoneyPolicy.list&populate=cleanMoneyPolicy.listWithNote&populate=cleanMoneyPolicy.exchangeDamagedNotes.icon&populate=banknotesCoins.images`;
    }

    if (pageName === "coreFunctionality") {
      url = `${baseUrl}/core-functions-overview?populate=heroCard.image&populate=monetaryPolicy.overview&populate=supervision.overview&populate=financialMarkets.overview&populate=financialMarkets.file.file&populate=currencyManagement.overview&populate=financialInfrastructureInnovation.overview&populate=currencyManagement.image&populate=financialInfrastructureInnovation.cards.image`;
    }

    if (pageName === "monetaryPolicy") {
      url = `${baseUrl}/monetary-policy?populate=heroCard.image&populate=heroCard.backgroundImage&populate=heroCard.items&populate=policyToolkit.heading&populate=policyToolkit.points&populate=statementsAndReports.overview&populate=statementsAndReports.year.month.items.file`;
    }

    if (pageName === "supervision") {
      url = `${baseUrl}/supervision?populate=heroCard.backgroundImage&populate=actsAndRegulations.overview&populate=actsAndRegulations.category.items.file&populate=supervisoryCirculars.overview&populate=supervisoryCirculars.year.items.file&populate=supervisedInstitutions.overview&populate=supervisedInstitutions.category.items&populate=unsupervisedInstitutions.overview&populate=unsupervisedInstitutions.category.items&populate=bankResolutions.overview&populate=bankResolutions.year.items.file`;
    }

    if (pageName === "monetaryLatest") {
      url = `${baseUrl}/monetary-policy/latestFiles`;
    }

    if (pageName === "supervisionLatest") {
      url = `${baseUrl}/supervision/latest-files`;
    }

    if (pageName === "calendarEvents") {
      url = `${baseUrl}/calendar?populate=heroSection&populate=calendar.category.events`;
    }

    const response = await axios.get(url);

    return { pageName, data: response.data };
  }
);

const pageContentSlice = createSlice({
  name: "pageContent",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPageContent.fulfilled, (state, action) => {
      const { pageName, data } = action.payload;
      state[pageName] = data;
    });
  },
});

export default pageContentSlice.reducer;
