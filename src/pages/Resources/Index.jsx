import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Input, Label, Row, Table } from "reactstrap";
import ReactPaginate from "react-paginate";
import { QueryBuilder } from "../../helpers/queryBuilder";
import dayjs from "dayjs";
import ResourceSection from "../DashboardEcommerce/ResourceSection";

const Index = () => {
  const router = useNavigate();

  const location = useLocation();
  const query = location.search;

  const [videos, setVideos] = useState([]);

  const [page, setPage] = useState(
    query?.page?.length && !isNaN(parseInt(query?.page))
      ? parseInt(query?.page)
      : 1
  );
  const [pageSize, setPageSize] = useState(
    query?.per_page?.length && !isNaN(parseInt(query?.page))
      ? parseInt(query?.per_page)
      : 20
  );
  const [totalSize, setTotalSize] = useState(300);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const fetchAssets = async () => {
    const request = await fetch(
      `https://api.video.wowza.com/api/v1.9/assets?page=${page}&per_page=${pageSize}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTU3NzEwZS0yYzhlLTQ1MDgtOTEwOS1hZWMxNTEwODAxY2UiLCJqdGkiOiJiYTdmZDdjOGMyN2RhMDNmZWUyZDU5YzE0MTI2NjAwMTI2MTI2NWU1ZTViOTI5ZjdhOGUxY2I5ZGY5ZjE5YzkwNTEzZTNiZGUyNjZlZjQyYiIsImlhdCI6MTY3NTc1NDA3MSwibmJmIjoxNjc1NzU0MDcxLCJleHAiOjIzMDY5MDYwNzEsInN1YiI6Ik9VLTI1OWRiNDQ3LWRiMjktNDM4NC1iNDE3LTQ4OGRlMTVmM2FhNiJ9.VUNg1bzKDetd-V40ONsF-kYBOX7Q0andNV-YFPCuYSHhysRMkks4MkyMttGjrEGAUbFdgEQ_qZRsEmAV-oJYpDfGjnsJZ4soAj2cRfNm1uRKoTw1nM-iZwmtvr3EZp9-OPhwXczzealYEoCl394pxYUOA4dDDGE11FgIvB_k15iNHDjg0EBGuCmgbQxdnMaeksiPV5EhDrUZSSapZ8rLMT2B1Dkq-BMFWgsd6oztoTmC3sokm29yF9TUoL3N9lx8cKGqBQP5aiGX0K1dB3iynTR3AgOGKkrhnDDzgSHlB1RnJjjLKAQv8__vlfG-fgDp9ppV-PAUQjZOwVSeMxzKuOYJWXEuFSgMfPngkIbQOFZWfGpcZYgFVLS9f4qNhitNOckihb7zvR2TiUAMPpW6qY8oZJfqrJQX7tn7fZStYBpngJ1M8PmEyfnaqiIo-1JzMW8ivdlDz4JH10UMLEhPr6hXI8Nl4VEoEsHnGzzBDlZ9vLJ-T2X_65kLu1vf_Tc-i8ZotI-x42LYyXgGmzGamj3Ge_P69lRCLD0pf7-KvxptR68TexMsIAuZsQC3uTBYhQ1GOM7KxXcPp2RRTSinAO6xG4wzprV4cmwUbD5WbFHhbJOYEh3_5p0cD0MjH5_WHcyP9BvFdjGMVgqsckf5F2QjbZklMDcj7vyEHwIaAxU`,
        },
      }
    );

    console.log({ status: request.ok });

    if (request.ok) {
      const data = await request.json();
      window.scrollTo(0, 0);
      setVideos(data.assets);
      setPage(data.pagination.page);
      setPageSize(data.pagination.per_page);
      setTotalSize(data.pagination.total_records);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [query]);

  const handleQuery = () => {
    const query = {
      page: page,
      per_page: pageSize,
    };

    router(`/resources${QueryBuilder(query)}`);
  };

  useEffect(() => {
    handleQuery();
  }, [page]);
  return (
    <React.Fragment>
      <div className="page-content mt-5">
        <Container
          style={{ backgroundColor: "white !important" }}
          className="p-5"
          fluid
        >
          <ResourceSection />
          <Row>
            <Col>
              <div className="table-responsive table-card">
                <Table className="align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: "46px" }}>
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="cardtableCheck"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="cardtableCheck"
                          ></Label>
                        </div>
                      </th>
                      <th scope="col">Resource Id</th>
                      <th scope="col">File name</th>
                      <th scope="col">Resource Size</th>
                      <th scope="col">Resource url</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="cardtableCheck01"
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="cardtableCheck01"
                            ></Label>
                          </div>
                        </td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.file_size}</td>
                        <td>{item.download_url}</td>
                        <td>{item.state}</td>
                        <td>{dayjs(item.created_at).format("DD MMMM YYYY")}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot></tfoot>
                </Table>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={Math.ceil(totalSize / pageSize)}
                  previousLabel="<"
                  renderOnZeroPageCount={() => null}
                  containerClassName="paginator"
                  activeClassName="active_paginate"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Index;
