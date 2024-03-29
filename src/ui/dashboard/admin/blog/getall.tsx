import moment from "moment";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { PastorController } from "../../../../controller/admin/pastor.controller";
import { BranchDTO } from "../../../../dto/Branch.dto";
import PastorDTO from "../../../../dto/Pastor.dto";
import UserDTO from "../../../../dto/User.dto";
import AdminLayout from "../admin.layout";

export default function GetAllBlogs() {
  const _tmp: BranchDTO[] = [];
  const _tmpPastors: PastorDTO[] = [];
  const router = useRouter();

  const [items, setItems] = useState(_tmp);
  const [pastors, setPastors] = useState(_tmpPastors);

  useEffect(() => {
    console.log(_tmpPastors);
    branchController.list(setItems);
    pastorController.list(setPastors);
  }, []);

  const branchController: BranchController = new BranchController();
  const pastorController: PastorController = new PastorController();

  return (
    <>
      <AdminLayout
        externalStyles={[]}
        navbar={""}
        title={"Blogs"}
        withFooter={false}
        withSideBar={true}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <span className="nav-tabs-title">Branch</span>
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <li className="nav-item mr-2">
                        <a
                          href={"/admin/addbranch"}
                          className="nav-link active"
                          data-toggle="tab"
                        >
                          Register New Branch
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href={"/admin/branch-assign-admin"}
                          className="nav-link active"
                          data-toggle="tab"
                        >
                          Assign Admin to Branch
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="col-xl-8 col-md-6" id="spinner_loader"></div>
                <div className="table-responsive" id="table_div">
                  <table className="table">
                    <thead className=" text-primary">
                      <th>Title</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Pastor</th>
                      <th>Is HQ</th>
                      <th>Date Created</th>
                      <th></th>
                      <th></th>
                    </thead>
                    <tbody id="tbody">
                      {items.length > 0
                        ? items.map((x, index) => {
                            return (
                              <tr key={index}>
                                <td
                                  onClick={() =>
                                    (window.location.href = `/item/${x.id}`)
                                  }
                                >
                                  {x.name}
                                </td>
                                <td> {x.state}</td>
                                <td> {x.city}</td>
                                <td>
                                  {branchController.renderPastor(pastors, x.id)}
                                </td>
                                <td> {x.isBranchHq ? "Yes" : "No"}</td>
                                <td>
                                  {" "}
                                  {moment(x.dateCreated).format("DD/MMM/yyyy")}
                                </td>

                                <td className="text-primary">
                                  <a
                                    onClick={() => {
                                      router.push(
                                        `/admin/edit-branch?id=${x.id}`
                                      );
                                    }}
                                    className="btn btn-primary pull-right text-white"
                                  >
                                    Edit
                                  </a>
                                </td>
                                <td className="text-primary">
                                  <a
                                    onClick={() => {
                                      branchController.delete(
                                        x.id,
                                        setItems,
                                        items
                                      );
                                    }}
                                    className="btn btn-primary pull-right text-white"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                            );
                          })
                        : undefined}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
